import pathlib
import subprocess
from typing import Tuple

from langchain_core.tools import tool

PROJECT_ROOT = pathlib.Path.cwd() / "generated_project"


def safe_path_for_project(path: str) -> pathlib.Path:
    resolved_path = (PROJECT_ROOT / path).resolve()
    root = PROJECT_ROOT.resolve()
    if root not in resolved_path.parents and root != resolved_path.parent and root != resolved_path:
        raise ValueError("Path is outside the project root")
    return resolved_path


@tool
def write_file(path: str, content: str) -> str:
    """Save content to a file at the given path inside the project root."""
    file_path = safe_path_for_project(path)
    file_path.parent.mkdir(parents=True, exist_ok=True)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    return f"WROTE:{file_path}"


@tool
def read_file(path: str) -> str:
    """Read the contents of a file at the given path inside the project root."""
    file_path = safe_path_for_project(path)
    if not file_path.exists():
        return ""
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()


@tool
def get_current_directory() -> str:
    """Get the current working directory for the project."""
    return str(PROJECT_ROOT)


@tool
def list_files(directory: str = ".") -> str:
    """List every file in the given directory under the project root."""
    dir_path = safe_path_for_project(directory)
    if not dir_path.is_dir():
        return f"ERROR: {dir_path} is not a directory"
    files = [str(f.relative_to(PROJECT_ROOT)) for f in dir_path.glob("**/*") if f.is_file()]
    return "\n".join(files) if files else "No files found."

@tool
def run_cmd(cmd: str, cwd: str = None, timeout: int = 30) -> Tuple[int, str, str]:
    """Execute a shell command in the specified directory and return the result."""
    working_dir = safe_path_for_project(cwd) if cwd else PROJECT_ROOT
    result = subprocess.run(cmd, shell=True, cwd=str(working_dir), capture_output=True, text=True, timeout=timeout)
    return result.returncode, result.stdout, result.stderr


def init_project_root():
    PROJECT_ROOT.mkdir(parents=True, exist_ok=True)
    return str(PROJECT_ROOT)