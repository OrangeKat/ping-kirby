package fr.epita.assistants.myide.domain.entity.features.maven;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.domain.entity.features.ProcessFeature;
import fr.epita.assistants.myide.utils.Logger;

import java.util.ArrayList;
import java.util.List;

public class MavenTestImp extends ProcessFeature {
    @Override
    public ExecutionReport execute(Project project, Object... params) {
        var param = new ArrayList<>(List.of("mvn", "test"));
        return this.launchProcess(project, param);
    }

    @Override
    public Feature.Type type() {
        return Mandatory.Features.Maven.TEST;
    }
}
