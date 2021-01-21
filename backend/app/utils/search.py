import os
from config import DOCS_DIR, FILE_EXTENTIONS


def search_files(query):
    search_results = []
    for path, subdirs, files in os.walk(DOCS_DIR):
        for name in files:
            filename, file_extension = os.path.splitext(name)
            if file_extension in FILE_EXTENTIONS:
                full_path = os.path.join(path, name)
                relative_path = full_path.replace(DOCS_DIR, '.')
                with open(full_path, "r") as in_file:
                    try:
                        for idx_line, line in enumerate(in_file):
                            if query in line:
                                result = {
                                    'line_no': idx_line + 1,
                                    'line_contents': str(line),
                                    'file_path': relative_path
                                }
                                search_results.append(result)
                    except UnicodeDecodeError as e:
                        print(
                            "[!] UnicodeDecodeError. Skipping file:\t<{}>\n".format(filepath))

    return search_results
