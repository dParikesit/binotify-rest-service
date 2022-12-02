-- Create username iniuser password iniuser
-- Create username iniadmin password iniadmin
INSERT INTO "Users" (name, email, password, username, "isAdmin") 
VALUES ('iniuser','iniuser@gmail.com','$2a$10$I5MHgviRl/Nryj0QGqqZT.dZVd2uS5hVa97OCgwHxoLcxqK/T9vEi','iniuser',false), 
('iniadmin','iniadmin@gmail.com','$2a$10$gdjn341z.L.bkDlPKrfTNu47CP5kBk8rd1dHEyy5wwBVblCu87gnO','iniadmin',true), 
('inipenyanyi','inipenyanyi@gmail.com','$2a$10$7eeycnjjvxe7SKFA7A3PueJNnUnep6XOl8BJ0aQ2Q7EYjrOMTEY/6','inipenyanyi',false),
('inipenyanyi2','inipenyanyi2@gmail.com','$2a$10$60Z979iYTH3K8wF7z/rutOJUBcXJRDR.H5sGJLhRFIahZ3EpWRcwW','inipenyanyi2',false),
('inipenyanyi3','inipenyanyi3@gmail.com','$2a$10$PqdI9LfcN8/KRN70KmaK4u1SqBPh4pEyU8vHFuVADvbT8CwQIuyVy','inipenyanyi3',false);


INSERT INTO "Songs" (judul, penyanyi_id, audio_path)
VALUES ('Hypeboy',3, 'http://localhost:3002/static/Hypeboy.mp3'),
('Attention',3, 'http://localhost:3002/static/Attention.mp3'),
('BBIBBI',4, 'http://localhost:3002/static/BBIBBI.mp3'),
('eight',4, 'http://localhost:3002/static/eight.mp3'),
('Blueming',4, 'http://localhost:3002/static/Blueming.mp3'),
('Palette',4, 'http://localhost:3002/static/Palette.mp3'),
('DDU-DU_DDU-DU',5, 'http://localhost:3002/static/DDU-DU_DDU-DU.mp3'),
('Dont_Know_What_To_Do',5, 'http://localhost:3002/static/Dont_Know_What_To_Do.mp3'),
('Forever_Young',5, 'http://localhost:3002/static/Forever_Young.mp3');


-- INSERT INTO "Users" (name, email, password, username, "isAdmin", "createdAt", "updatedAt") VALUES ('iniuser','iniuser@gmail.com','$2a$10$I5MHgviRl/Nryj0QGqqZT.dZVd2uS5hVa97OCgwHxoLcxqK/T9vEi','iniuser',false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP), ('iniadmin','iniadmin@gmail.com','$2a$10$gdjn341z.L.bkDlPKrfTNu47CP5kBk8rd1dHEyy5wwBVblCu87gnO','iniadmin',true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- INSERT INTO "Songs" (song_id, judul, penyanyi_id, audio_path, "createdAt", "updatedAt")
-- VALUES ('e1f3f5cc-b1b4-4cd1-b33c-3fe4a7217bbf','Hypeboy',2, '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
-- ('0930a156-5859-4ef2-8e8f-1b70f2d259e3','Attention',2, '', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

