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

# Build query to retrieve an employee.
#
# + email - Identification of the user
# + return - sql:ParameterizedQuery - Select query for to retrieve an employee information
isolated function getEmployeeInfo(string email) returns sql:ParameterizedQuery {
    sql:ParameterizedQuery query = `SELECT
        e.id                                         AS id,
        e.last_name                                  AS lastName,
        e.first_name                                 AS firstName,
        e.work_location                                      AS workLocation,
        e.epf                                        AS epf,
        e.employee_location                          AS employeeLocation,
        e.wso2_email                                 AS wso2Email,
        e.work_phone_number                          AS workPhoneNumber,
        e.start_date                                 AS startDate,
        e.job_role                                   AS jobRole,
        e.manager_email                              AS managerEmail,
        e.report_to_email                            AS reportToEmail,
        e.additional_manager_email                   AS additionalManagerEmail,
        e.additional_report_to_email                 AS additionalReportToEmail,
        e.employee_status                            AS employeeStatus,
        e.length_of_service                          AS lengthOfService,
        e.relocation_status                          AS relocationStatus,
        e.employee_thumbnail                         AS employeeThumbnail,
        e.subordinate_count                          AS subordinateCount,
        e._timestamp                                 AS timestamp,
        e.probation_end_date                         AS probationEndDate,
        e.agreement_end_date                         AS agreementEndDate,
        et.name                                      AS employmentType,
        c.name                                       AS company,
        o.name                                       AS office,
        bu.name                                      AS businessUnit,
        t.name                                       AS team,
        st.name                                      AS subTeam,
        u.name                                       AS unit
    FROM employee e
    LEFT JOIN employment_type      et ON et.id  = e.employment_type_id
    LEFT JOIN office               o  ON o.id   = e.office_id
    LEFT JOIN company              c  ON c.id   = o.company_id
    LEFT JOIN hris_business_unit   bu ON bu.id  = e.business_unit_id
    LEFT JOIN hris_team            t  ON t.id   = e.team_id
    LEFT JOIN hris_sub_team        st ON st.id  = e.sub_team_id
    LEFT JOIN hris_unit            u  ON u.id   = e.unit_id
    WHERE e.wso2_email = ${email}`;

    return query;
}

