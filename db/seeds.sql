USE publichealth_db
-- Insert sample departments
INSERT INTO departments (name) VALUES
  ('Infectious Disease'),
  ('Communicable Disease'),
  ('Public Health Informatics'),
  ('IT');

-- Insert sample roles
INSERT INTO roles (title, salary, department_id) VALUES
  ('Epidemiolgist I', 80000, 1),
  ('Epidemiologist II', 95000, 1),
  ('Director of Epidemiology', 200000, 1),
  ('Intern Epidemiologist', 45000, 1),
  ('Senior Epidemiologist', 110000, 2),
  ('Intern Epidemiologist', 45000, 2),
  ('Public Health Communication', 70000, 3),
  ('Biostatician', 110000, 3),
  ('Biostatician II', 120000, 3),
  ('Health Educator I', 51000, 3),
  ('Software Engineer I', 93000, 4),
  ('Junior Engineer', 60000, 4);


-- Insert sample employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
  ('Anthony', 'Fauci', 3, 1),
  ('Joe', 'Smith', 1, 2),
  ('Michael', 'Johnson', 2, 3),
  ('Emily', 'Thomas', 3, NULL),
  ('David', 'Wilson', 4, NULL),
  ('Emily', 'Davis', 5, NULL),
  ('David', 'Wilson', 6, NULL),
  ('Sarah', 'Brown', 7, NULL),
  ('Robert', 'Miller', 8, 4),
  ('Jessica', 'Taylor', 9, 5),
  ('Michael', 'Anderson', 10, NULL),
  ('Emily', 'Harris', 11, NULL),
  ('Christopher', 'Clark', 12, NULL),
  ('Laura', 'Lewis', 13, NULL),
  ('Matthew', 'Hall', 14, NULL);