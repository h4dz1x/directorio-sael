-- ============================================
-- DATOS INICIALES – Importados desde CSV
-- Ejecutar después de schema.sql
-- ============================================

INSERT INTO public.contactos (nombre, apellido_1, apellido_2, num_corto, num_largo, mail, puesto, servicio, foto) VALUES
('Agueda', 'Leal', 'Quiñones', '45115', '956551905', 'alealq@dipucadiz.es', 'Técnica', 'Recursos Humanos', 'https://drive.google.com/open?id=1JbsquzRTtm4OaPn9C7mo-mj6tm3ud7Qs'),
('Agustín', 'Martínez', 'López', '45106', '956152006', 'agustin.martinez.lopez@dipucadiz.es', 'Administrativo', 'Recursos Humanos', 'https://drive.google.com/open?id=1Vnd7wk6bbaQBvghOOroVKL2d2Hl5DsIr'),
('Antonio Jesús', 'Sánchez', 'Guirado', '45113', '956152013', 'ajsanchezg@dipucadiz.es', 'Técnico', 'Protección de Datos', ''),
('Carlos', 'García', 'Rodríguez', '45124', '956152024', 'carlos.garcia.rodriguez@dipucadiz.es', 'Administrativo', 'Contratación proyectos y facturas', 'https://drive.google.com/open?id=10v0KDkilhPrLjCTLz_FpVF_YsgnVh_QB'),
('Eduardo', 'Galindo', 'Merchan', '45135', '956152035', 'eduardo.galindo.merchan@dipucadiz.es', 'Administrativo', 'Formación', 'https://drive.google.com/open?id=1qJrOxqKcTeIYWO9ewP2jilVet1GvcHsw'),
('Elena', 'Vidal', 'Pérez', '45133', '', 'elena.vidal.perez@dipucadiz.es', 'Técnica', 'Jurídico', 'https://drive.google.com/open?id=1IE83Fw5cuDn6MSERPgUTex2gICWzZRA-'),
('Elena', 'Zambrano', 'Romero', '', '', 'elena.zambrano.romero@dipucadiz.es', 'Técnica', 'Jurídico', ''),
('Fernando', 'Díaz', 'Ortega', '45148', '956152048', 'fernando.diaz.ortega@dipucadiz.es', 'Técnico', 'Jurídico', ''),
('Francisco José', 'Martínez', 'Alba', '45105', '956152005', 'francisco.martinez.alba@dipucadiz.es', 'Administrativo', 'Formación', 'https://drive.google.com/open?id=1T_0yO2ZXlECo3YKHxlCjSFx9VbHSyapq'),
('Isabel', 'Sánchez', 'Gil', '45120', '956152020', 'isabel.sanchez.gil@dipucadiz.es', 'Técnica', 'Recursos Humanos', 'https://drive.google.com/open?id=1hrHLcJIQM4f_5gqlbDZfDZcgmGmFIg-2'),
('Isidro', 'Gómez', 'García', '', '', 'isidro.gomez.garcia@dipucadiz.es', 'Auxiliar Administrativo', 'Jurídico', ''),
('Javier Alfonso', 'Clavijo', 'González', '45139', '956152039', 'javieralfonso.clavijo.gonzalez@dipucadiz.es', 'Técnico', 'Jurídico', 'https://drive.google.com/open?id=1dZ0cuTcvYN7RWjzLixDpJnBGsjBPz76T'),
('Jorge', 'Grimaldi', 'Torres', '617179262', '', 'jorge.grimaldi.torres@dipucadiz.es', 'Auxiliar administrativo', 'Económico', 'https://drive.google.com/open?id=1L5hNW_7YTIErj2yHHFg2ZnEKc9UxG4PM'),
('José Manuel', 'Pérez', 'Alcaraz', '45118', '956152018', 'josemanuel.perez.alcaraz@dipucadiz.es', 'Jefe', 'Jurídico', ''),
('José María', 'Diánez', 'Sánchez', '45116', '956152016', 'josemaria.dianez.sanchez@dipucadiz.es', 'Técnico', 'Formación', ''),
('María del Carmen', 'Albarrán', 'Moreno', '', '', 'mariacarmen.albarran.moreno@dipucadiz.es', 'Técnica', 'Recursos Humanos', ''),
('Mario', 'Martín', 'Ojeda', '45141', '956152041', 'mmartin@dipucadiz.es', 'Vicedirector de Área', 'Dirección', 'https://drive.google.com/open?id=1JuUwyoQFGj3vv-e3dnti7dINH2az3pXG'),
('María Jesús', 'Rodríguez', 'Fernández', '45146', '956152046', 'mariajesus.rodriguez.fernandez@dipucadiz.es', 'Auxiliar administrativa', 'Contratación proyectos y facturas', 'https://drive.google.com/open?id=1hTjk8vpFS5L04Raf3SKBi9H9xWM3ZjR5'),
('María Victoria', 'Mayorga', 'Rubio', '45117', '', 'mariavictoria.mayorga.rubio@dipucadiz.es', 'Técnica', 'Jurídico', ''),
('María', 'Alcántara', 'Verdugo', '45122', '', 'maria.alcantara.verdugo@dipucadiz.es', 'Auxiliar Administrativo', 'Económico', ''),
('María', 'Fley', 'Báez', '45147', '956152047', 'maria.fley.baez@dipucadiz.es', 'Técnico', 'Contratación proyectos y facturas', 'https://drive.google.com/open?id=1bHn3HQ6SZcoX9n40xLuLTg62IcwBURlM'),
('Mercedes', 'Fernández', 'Cordero', '45110', '', 'mercedes.fernandez.cordero@dipucadiz.es', 'Auxiliar Administrativa', 'Dirección', ''),
('Mª del Patrocinio', 'Gómez', 'Collantes', '45123', '956245123', 'mariapatrocinio.gomez.collantes@dipucadiz.es', 'Técnica', 'Jurídico', 'https://drive.google.com/open?id=1hXxUTvZcRd4WvvanUNAbrLxEBT3-gFcu'),
('Mª José', 'Álvarez', 'Luna', '45149', '956152049', 'mariajose.alvarez.luna@dipucadiz.es', 'Técnica', 'Contratación proyectos y facturas', ''),
('Rocío Ana', 'González', 'Iborra', '45108', '956152008', 'rocioana.gonzalez.iborra@dipucadiz.es', '', 'Formación', ''),
('Rocío', 'Romero', 'Sánchez', '45127', '956152027', 'rocio.romero.sanchez@dipucadiz.es', 'Administrativa', 'Dirección', 'https://drive.google.com/open?id=14pk-OPDS4RlSkzZBsBij4LBp0qjLpSDP'),
('Rogelio', 'Navarrete', 'Manchado', '45126', '956152026', 'rogelio.navarrete.manchado@dipucadiz.es', 'Jefe Económico', 'Económico', ''),
('Rosa', 'Alonso', 'Rodríguez', '45143', '956152043', 'ralonsor@dipucadiz.es', 'Administrativo', 'Otro', 'https://drive.google.com/open?id=1ovWfacyHmBY5crkQv48KUFyXnFqrVMmd'),
('Vanessa', 'Braza', 'Blanco', '45128', '', 'mvbraza@dipucadiz.es', 'JUT / Técnico', 'Económico', 'https://drive.google.com/open?id=1LUXnjWp0RJYuYeZk4pKMglk3n50ipwCV'),
('Óscar', 'Palma', 'Toledo', '', '', 'oscar.palma.toledo@dipucadiz.es', 'Coordinador', 'Dirección', '');
