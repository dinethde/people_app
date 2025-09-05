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
import ballerina/sql;

# fetch employee info from an email.
#
# + email - parameter description
# + return - return value description
public isolated function fetchEmployeeInfo(string email) returns EmployeeInfo|error? {
    EmployeeInfo|sql:Error result = databaseClient->queryRow(getEmployeeInfo(email));

    if result is EmployeeInfo {
        EmployeeInfo employee = {
            id: result.id,
            lastName: result.lastName,
            firstName: result.firstName,
            workLocation: result.workLocation,
            epf: result.epf,
            employeeLocation: result.employeeLocation,
            wso2Email: result.wso2Email,
            workPhoneNumber: result.workPhoneNumber,
            startDate: result.startDate,
            jobRole: result.jobRole,
            managerEmail: result.managerEmail,
            reportToEmail: result.reportToEmail,
            additionalManagerEmail: result.additionalManagerEmail,
            additionalReportToEmail: result.additionalReportToEmail,
            employeeStatus: result.employeeStatus,
            lengthOfService: result.lengthOfService,
            relocationStatus: result.relocationStatus,
            employeeThumbnail: result.employeeThumbnail,
            subordinateCount: result.subordinateCount,
            timestamp: result.timestamp,
            probationEndDate: result.probationEndDate,
            agreementEndDate: result.agreementEndDate,
            employmentType: result.employmentType,
            company: result.company,
            office: result.office,
            businessUnit: result.businessUnit,
            team: result.team,
            subTeam: result.subTeam,
            unit: result.unit
        };
        return employee;
    }

    return result;
}
