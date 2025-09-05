USE `hris_people`;

START TRANSACTION;

-- ---------- ORG STRUCTURE (Masters) ----------
INSERT INTO hris_business_unit (id, name, head_email, created_by, updated_by)
VALUES
  (1, 'Engineering', 'eng-head@acme.com', 'seed', 'seed'),
  (2, 'Sales',       'sales-head@acme.com', 'seed', 'seed');

INSERT INTO hris_team (id, name, head_email, created_by, updated_by)
VALUES
  (1, 'Platform',  'platform-lead@acme.com', 'seed', 'seed'),
  (2, 'Web',       'web-lead@acme.com',      'seed', 'seed'),
  (3, 'Field',     'field-lead@acme.com',    'seed', 'seed');

-- BU <-> Team (prevent duplicates by your app; here we keep one mapping per pair)
INSERT INTO hris_business_unit_team (id, business_unit_id, team_id, head_email, created_by, updated_by)
VALUES
  (1, 1, 1, 'platform-lead@acme.com', 'seed', 'seed'),   -- Eng - Platform
  (2, 1, 2, 'web-lead@acme.com',      'seed', 'seed'),   -- Eng - Web
  (3, 2, 3, 'field-lead@acme.com',    'seed', 'seed');   -- Sales - Field

INSERT INTO hris_sub_team (id, name, head_email, created_by, updated_by)
VALUES
  (1, 'Infra',      'infra-lead@acme.com',     'seed', 'seed'),
  (2, 'Frontend',   'frontend-lead@acme.com',  'seed', 'seed'),
  (3, 'Enterprise', 'enterprise-lead@acme.com','seed', 'seed');

-- (BU-Team) <-> SubTeam
INSERT INTO hris_business_unit_team_sub_team
  (id, business_unit_team_id, sub_team_id, head_email, created_by, updated_by)
VALUES
  (1, 1, 1, 'infra-lead@acme.com',     'seed', 'seed'),  -- Eng/Platform -> Infra
  (2, 2, 2, 'frontend-lead@acme.com',  'seed', 'seed'),  -- Eng/Web -> Frontend
  (3, 3, 3, 'enterprise-lead@acme.com','seed', 'seed');  -- Sales/Field -> Enterprise

INSERT INTO hris_unit (id, name, head_email, created_by, updated_by)
VALUES
  (1, 'Identity',  'identity-head@acme.com',  'seed', 'seed'),
  (2, 'Payments',  'payments-head@acme.com',  'seed', 'seed'),
  (3, 'Analytics', 'analytics-head@acme.com', 'seed', 'seed');

-- (BU-Team-SubTeam) <-> Unit
INSERT INTO hris_business_unit_team_sub_team_unit
  (id, business_unit_team_sub_team_id, unit_id, head_email, created_by, updated_by)
VALUES
  (1, 1, 1, 'identity-head@acme.com',  'seed', 'seed'),  -- Eng/Platform/Infra -> Identity
  (2, 2, 2, 'payments-head@acme.com',  'seed', 'seed'),  -- Eng/Web/Frontend -> Payments
  (3, 3, 3, 'analytics-head@acme.com', 'seed', 'seed');  -- Sales/Field/Enterprise -> Analytics


-- ---------- COMPANY / OFFICE ----------
INSERT INTO company (id, name, location, is_active, created_by, updated_by)
VALUES
  (1, 'WSO2',  'Colombo', 1, 'seed', 'seed');

INSERT INTO office (id, company_id, name, location, is_active, created_by, updated_by)
VALUES
  (1, 1, 'HQ Colombo', 'Colombo', 1, 'seed', 'seed'),
  (2, 1, 'Remote',     'Global',  1, 'seed', 'seed');


-- ---------- CAREER FUNCTION / DESIGNATION ----------
INSERT INTO career_function (id, career_function, created_by, updated_by)
VALUES
  (1, 'Engineering', 'seed', 'seed'),
  (2, 'Sales',       'seed', 'seed');

INSERT INTO designation (id, designation, job_band, status, career_function_id, created_by, updated_by)
VALUES
  (1, 'Software Engineer',        'Band 5', 'Active', 1, 'seed', 'seed'),
  (2, 'Senior Software Engineer', 'Band 6', 'Active', 1, 'seed', 'seed'),
  (3, 'Account Executive',        'Band 5', 'Active', 2, 'seed', 'seed');


-- ---------- EMPLOYMENT TYPE ----------
INSERT INTO employment_type (id, name, created_by, updated_by, is_active)
VALUES
  (1, 'Full-time',  'seed', 'seed', 1),
  (2, 'Intern',     'seed', 'seed', 1),
  (3, 'Contractor', 'seed', 'seed', 1);


-- ---------- PERSONAL INFO ----------
INSERT INTO personal_info
  (id, nic, full_name, name_with_initials, first_name, last_name, dob, age,
   personal_email, personal_phone, home_phone, `address`, postal_code, country, nationality,
   language_spoken, nok_info, onboarding_documents, education_info)
VALUES
  (
    1, '902345678V', 'Dineth Silva', 'D. Silva', 'Dineth', 'Silva', '1990-05-10', 35,
    'dineth.silva@example.com', '+94-71-1111111', '+94-11-2222222', '123, Flower Rd, Colombo', '00700',
    'Sri Lanka', 'Sri Lankan',
    JSON_ARRAY('English', 'Sinhala'),
    JSON_OBJECT('name','Kamal Silva','relationship','Father','phone','+94-77-1234567'),
    JSON_ARRAY(
      JSON_OBJECT('type','NIC','file','s3://bucket/nic_1.pdf'),
      JSON_OBJECT('type','Birth Certificate','file','s3://bucket/bc_1.pdf')
    ),
    JSON_ARRAY(
      JSON_OBJECT('degree','BSc Computer Science','institute','UoM','year',2013)
    )
  ),
  (
    2, '972223333V', 'Harini Munasinghe', 'H. Munasinghe', 'Harini', 'Munasinghe', '1997-09-22', 27,
    'harini.m@example.com', '+94-71-3333333', NULL, '45, Palm Grove, Nugegoda', '10250',
    'Sri Lanka', 'Sri Lankan',
    JSON_ARRAY('English'),
    JSON_OBJECT('name','Nimali M.','relationship','Mother','phone','+94-77-7654321'),
    JSON_ARRAY(JSON_OBJECT('type','NIC','file','s3://bucket/nic_2.pdf')),
    JSON_ARRAY(JSON_OBJECT('degree','BSc Information Systems','institute','UoK','year',2019))
  ),
  (
    3, '915551234V', 'Rashvini Weerasinghe', 'R. Weerasinghe', 'Rashvini', 'Weerasinghe', '1991-12-05', 33,
    'rashvini.w@example.com', '+94-77-8888888', NULL, '12, Lake Rd, Kandy', '20000',
    'Sri Lanka', 'Sri Lankan',
    JSON_ARRAY('English', 'Tamil'),
    JSON_OBJECT('name','Suresh W.','relationship','Spouse','phone','+94-70-9999999'),
    JSON_ARRAY(JSON_OBJECT('type','NIC','file','s3://bucket/nic_3.pdf')),
    JSON_ARRAY(JSON_OBJECT('degree','BA Marketing','institute','OUSL','year',2015))
  );


-- ---------- RECRUITS ----------
-- One engineering recruit, one sales recruit
INSERT INTO recruit
  (id, first_name, last_name, wso2_email, date_of_join, probation_end_date, agreement_end_date, employee_location,
   work_location, reports_to, manager_email, compensation, additional_comments, status, created_by, updated_by,
   business_unit, unit, team, sub_team, company, office, employment_type, designation_id, personal_info_id)
VALUES
  (
    1, 'Dineth', 'Silva', 'dineth.silva@wso2.com', '2025-09-15', '2026-03-15', NULL, NULL,
    'Colombo', 'Platform Lead', 'platform-lead@acme.com',
    JSON_OBJECT('base', 300000, 'currency', 'LKR', 'bonus_pct', 10),
    NULL, 'Offer Accepted', 'seed', 'seed',
    1, 1, 1, 1, 1, 1, 1, 1, 1
  ),
  (
    2, 'Harini', 'Munasinghe', 'harini.m@wso2.com', '2025-10-01', '2026-04-01',NULL, NULL,
    'Remote', 'Field Manager', 'field-lead@acme.com',
    JSON_OBJECT('base', 220000, 'currency', 'LKR', 'allowance', 25000),
    NULL, 'Pending', 'seed', 'seed',
    2, 3, 3, 3, 1, 2, 3, 3, 2
  );


-- ---------- RESIGNATION (1 example) ----------
INSERT INTO resignation
  (id, final_day_in_office, final_day_of_employeement, reason, `date`, created_by, updated_by)
VALUES
  (1, '2025-08-15', '2025-08-31', 'Personal reasons', '2025-07-10', 'seed', 'seed');


-- ---------- EMPLOYEES ----------
-- One active Engineering employee (mapped to recruit 1 personal info)
-- One Sales employee showing a resignation example
INSERT INTO employee
  (id, last_name, first_name, title, epf, employee_location, work_location, wso2_email, start_date, job_role,
   manager_email, report_to_email, additional_manager_email, additional_report_to_email,
   employee_status, work_phone_number, length_of_service, relocation_status, employee_thumbnail,
   subordinate_count, probation_end_date, agreement_end_date,
   employment_type_id, resignation_id, designation_id, office_id, team_id, sub_team_id, business_unit_id, unit_id, personal_info_id)
VALUES
  (
    'E-1001', 'Silva', 'Dineth', 'Software Engineer', 'EPF-001', NULL, 'Colombo', 'dineth.silva@wso2.com', '2025-09-15',
    'Platform Engineering',
    'platform-lead@acme.com', 'platform-lead@acme.com', NULL, NULL,
    'Active', '+94-11-5555555', 0, 'No', 'https://img.example.com/e1001.png',
    2, '2026-03-15', NULL,
    1, NULL, 1, 1, 1, 1, 1, 1, 1
  ),
  (
    'E-2001', 'Weerasinghe', 'Rashvini', 'Account Executive', 'EPF-002', NULL, 'Colombo', 'rashvini.w@wso2.com', '2023-02-01',
    'Enterprise Sales',
    'field-lead@acme.com', 'field-lead@acme.com', NULL, NULL,
    'Resigned', '+94-11-4444444', 2, 'No', 'https://img.example.com/e2001.png',
    0, NULL, NULL,
    3, 1, 3, 2, 3, 3, 2, 3, 3
  );

COMMIT;
