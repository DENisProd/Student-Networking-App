export interface ProjectMember {
  id: number;
  name: string;
  avatar?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  members: ProjectMember[];
} 