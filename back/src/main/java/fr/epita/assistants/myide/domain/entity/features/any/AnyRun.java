package fr.epita.assistants.myide.domain.entity.features.any;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.domain.entity.features.ProcessFeature;
import fr.epita.assistants.myide.utils.Logger;

import java.util.ArrayList;
import java.util.List;

public class AnyRun extends ProcessFeature {
    @Override
    public Feature.ExecutionReport execute(Project project, Object... params) {
        String filePath = params[0].toString();
        filePath = filePath.substring(filePath.indexOf('[') + 1, filePath.lastIndexOf(']'));
        String mainClassName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'));
        Logger.log("filepath: " + filePath);
        Logger.log("mainClass: " + mainClassName);
        List<String> compileArgs = new ArrayList<>();
        compileArgs.add("javac");
        compileArgs.add(filePath);

        ExecutionReport compileReport = launchProcess(project, compileArgs);
        if (!compileReport.isSuccess().isSuccess) {;
            return compileReport;
        }

        List<String> runArgs = new ArrayList<>();
        runArgs.add("java");
        runArgs.add(mainClassName);

        return launchProcess(project, runArgs);
    }

    @Override
    public Type type() {
        return Mandatory.Features.Any.RUN;
    }
}
