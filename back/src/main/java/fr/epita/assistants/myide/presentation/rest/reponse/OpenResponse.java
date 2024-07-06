package fr.epita.assistants.myide.presentation.rest.reponse;

import fr.epita.assistants.myide.domain.entity.Aspect;
import fr.epita.assistants.myide.domain.entity.ProjectFile;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Set;

@AllArgsConstructor
public class OpenResponse {
    public ProjectFile CurrentFile;
    public ProjectFile FileTree;
    public List<ProjectFile> ListFile;
    public Set<Aspect> Aspects;
}
