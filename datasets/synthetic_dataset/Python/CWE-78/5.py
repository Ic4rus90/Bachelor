import subprocess

def backup_database(db_name, backup_path):
    cmd = "mysqldump --databases " + db_name + " > " + backup_path
    subprocess.run(cmd, shell=True)
