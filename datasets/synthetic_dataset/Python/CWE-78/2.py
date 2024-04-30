import subprocess

def get_file_details(filename):
    process = subprocess.Popen("ls -l " + filename, shell=True, stdout=subprocess.PIPE)
    output, error = process.communicate()
    return output
