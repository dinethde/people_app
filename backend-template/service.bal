// Copyright (c) 2025 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
import people_app.authorization;
import people_app.database;
import people_app.entity;

import ballerina/cache;
import ballerina/http;
import ballerina/log;

public configurable AppConfig appConfig = ?;

final cache:Cache cache = new ({
    capacity: 2000,
    defaultMaxAge: 1800.0,
    cleanupInterval: 900.0
});

final cache:Cache employeeInfoCache = new (capacity = 100, evictionFactor = 0.2);

@display {
    label: "People Application",
    id: "domain/people-application"
}

service class ErrorInterceptor {
    *http:ResponseErrorInterceptor;

    remote function interceptResponseError(error err, http:RequestContext ctx) returns http:BadRequest|error {

        // Handle data-binding errors.
        if err is http:PayloadBindingError {
            string customError = string `Payload binding failed!`;
            log:printError(customError, err);
            return {
                body: {
                    message: customError
                }
            };
        }
        return err;
    }
}

service http:InterceptableService / on new http:Listener(9090) {

    # Request interceptor.
    #
    # + return - authorization:JwtInterceptor, ErrorInterceptor
    public function createInterceptors() returns http:Interceptor[] =>
        [new authorization:JwtInterceptor(), new ErrorInterceptor()];

    # Fetch samples AppConfig.
    #
    # + return - AppConfig
    resource function get app\-config() returns AppConfig => appConfig;

    # Fetch user information of the logged in users.
    #
    # + ctx - Request object
    # + return - User info object|Error
    resource function get user\-info(http:RequestContext ctx) returns UserInfoResponse|http:InternalServerError {

        // User information header.
        authorization:CustomJwtPayload|error userInfo = ctx.getWithType(authorization:HEADER_USER_INFO);
        if userInfo is error {
            return <http:InternalServerError>{
                body: {
                    message: "User information header not found!"
                }

            };
        }

        // Check cache for logged in user.
        if cache.hasKey(userInfo.email) {
            UserInfoResponse|error cachedUserInfo = cache.get(userInfo.email).ensureType();
            if cachedUserInfo is UserInfoResponse {
                return cachedUserInfo;
            }
        }

        // Fetch the user information from the entity service.
        entity:Employee|error loggedInUser = entity:fetchEmployeesBasicInfo(userInfo.email);
        if loggedInUser is error {
            string customError = string `Error occurred while retrieving user data: ${userInfo.email}!`;
            log:printError(customError, loggedInUser);
            return <http:InternalServerError>{
                body: {
                    message: customError
                }
            };
        }

        // Fetch the user's privileges based on the roles.
        int[] privileges = [];
        if authorization:checkPermissions([authorization:authorizedRoles.employeeRole], userInfo.groups) {
            privileges.push(authorization:EMPLOYEE_ROLE_PRIVILEGE);
        }
        if authorization:checkPermissions([authorization:authorizedRoles.headPeopleOperationsRole], userInfo.groups) {
            privileges.push(authorization:HEAD_PEOPLE_OPERATIONS_PRIVILEGE);
        }

        UserInfoResponse userInfoResponse = {...loggedInUser, privileges};

        error? cacheError = cache.put(userInfo.email, userInfoResponse);
        if cacheError is error {
            log:printError("An error occurred while writing user info to the cache", cacheError);
        }
        return userInfoResponse;
    }

    # Fetch user information of the logged in users.
    #
    # + email - user's wso2 email
    # + return - Employeeinfo object|Error
    resource function get employee\-info/[string email]() returns EmployeeInfo|http:InternalServerError|http:Forbidden|http:BadRequest|http:NotFound {

        if !email.matches(WSO2_EMAIL) {
            return <http:BadRequest>{
                body: {
                    message: string `Input email is not a valid WSO2 email address: ${email}`
                }
            };
        }

        EmployeeInfo|error cacheResult;
        EmployeeInfo|error? employeeInfo;
        if employeeInfoCache.hasKey(email) {
            cacheResult = employeeInfoCache.get(email).ensureType();

            if cacheResult is error {
                log:printError("Cache result error : ", cacheResult);
            }

            if cacheResult is EmployeeInfo {
                employeeInfo = employeeInfoCache.put(email, cacheResult);
            }
        }

        employeeInfo = database:fetchEmployeeInfo(email);

        if employeeInfo is error {
            log:printError("Error", employeeInfo);
            return <http:InternalServerError>{
                body: {
                    message: "Internal Server Error"
                }
            };
        }

        if employeeInfo is () {
            return <http:NotFound>{
                body: {
                    message: "User Not Found"
                }
            };
        }

        return employeeInfo;

    }
}
