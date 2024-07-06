package fr.epita.assistants.myide.domain.entity.features.maven;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.domain.entity.features.ProcessFeature;

import java.util.ArrayList;
import java.util.List;

public class MavenCleanImp extends ProcessFeature {

    @Override
    public Feature.ExecutionReport execute(Project project, Object... params) {
        var param = new ArrayList<>(List.of("mvn", "clean"));
        for (var e : params) {
            param.add(e.toString());
        }
        return this.launchProcess(project, param);
    }

    @Override
    public Feature.Type type() {
        return Mandatory.Features.Maven.CLEAN;
    }
}
