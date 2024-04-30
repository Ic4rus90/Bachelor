import subprocess

def compile_code(file_path):
    command = "gcc " + file_path + " -o output"
    subprocess.run(command, shell=True, check=True)
