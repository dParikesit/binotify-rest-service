-- Create username iniuser password iniuser
-- Create username iniadmin password iniadmin
INSERT INTO "Users" (name, email, password, username, "isAdmin") VALUES ('iniuser','iniuser@gmail.com','$2a$10$I5MHgviRl/Nryj0QGqqZT.dZVd2uS5hVa97OCgwHxoLcxqK/T9vEi','iniuser',false), ('iniadmin','iniadmin@gmail.com','$2a$10$gdjn341z.L.bkDlPKrfTNu47CP5kBk8rd1dHEyy5wwBVblCu87gnO','iniadmin',true);

INSERT INTO "Songs" (song_id, judul, penyanyi_id, audio_path)
VALUES ('e1f3f5cc-b1b4-4cd1-b33c-3fe4a7217bbf','Hypeboy',2, ''),
('0930a156-5859-4ef2-8e8f-1b70f2d259e3','Attention',2, '');


-- INSERT INTO "Users" (name, email, password, username, "isAdmin", "createdAt", "updatedAt") VALUES ('iniuser','iniuser@gmail.com','$2a$10$I5MHgviRl/Nryj0QGqqZT.dZVd2uS5hVa97OCgwHxoLcxqK/T9vEi','iniuser',false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), ('iniadmin','iniadmin@gmail.com','$2a$10$gdjn341z.L.bkDlPKrfTNu47CP5kBk8rd1dHEyy5wwBVblCu87gnO','iniadmin',true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- INSERT INTO "Songs" (song_id, judul, penyanyi_id, audio_path, "createdAt", "updatedAt")
-- VALUES ('e1f3f5cc-b1b4-4cd1-b33c-3fe4a7217bbf','Hypeboy',2, '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('0930a156-5859-4ef2-8e8f-1b70f2d259e3','Attention',2, '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

