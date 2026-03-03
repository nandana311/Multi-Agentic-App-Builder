from typing import Optional

from pydantic import BaseModel, Field, ConfigDict


class File(BaseModel):
    path: str = Field(description="File path to be created or updated")
    purpose: str = Field(description="Reason for the file, e.g. 'core logic', 'data handler', etc.")
    
class Plan(BaseModel):
    name: str = Field(description="Project name")
    description: str = Field(description="Short summary of the app, e.g. 'A tool for tracking expenses'")
    techstack: str = Field(description="Technologies to use, e.g. 'python', 'react', 'flask', etc.")
    features: list[str] = Field(description="Features required, e.g. 'login', 'charts', etc.")
    files: list[File] = Field(description="Files to generate, each with a path and purpose")

class ImplementationTask(BaseModel):
    filepath: str = Field(description="File to be changed")
    task_description: str = Field(description="Detailed task for the file, e.g. 'add login', 'build chart logic', etc.")

class TaskPlan(BaseModel):
    implementation_steps: list[ImplementationTask] = Field(description="Ordered steps to complete the project")
    plan: Optional[Plan] = None
    model_config = ConfigDict(extra="forbid")
    
class CoderState(BaseModel):
    task_plan: TaskPlan = Field(description="Task plan to execute")
    current_step_idx: int = Field(0, description="Current step index in the implementation steps")
    current_file_content: Optional[str] = Field(None, description="Content of the file being edited or created")