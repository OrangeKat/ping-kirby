package fr.epita.assistants.myide.domain.entity;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class ProjectFile {
    public String name;
    public String parentPath;
    public String content;
    public List<ProjectFile> children;
    public boolean isFile;
}
