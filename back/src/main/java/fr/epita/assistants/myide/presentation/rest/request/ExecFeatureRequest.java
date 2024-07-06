package fr.epita.assistants.myide.presentation.rest.request;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
public class ExecFeatureRequest {
    public String feature;
    public List<String> params;
    public String project;
}
