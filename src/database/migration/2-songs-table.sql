CREATE TABLE IF NOT EXISTS "Songs" (
    song_id uuid primary key NOT NULL DEFAULT uuid_generate_v4(),
    judul VARCHAR(64) NOT NULL,
    penyanyi_id INTEGER NOT NULL REFERENCES "Users" (id) ON UPDATE CASCADE on DELETE SET NULL,
    audio_path VARCHAR(256);
);