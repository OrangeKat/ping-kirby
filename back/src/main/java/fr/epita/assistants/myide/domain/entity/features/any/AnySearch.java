package fr.epita.assistants.myide.domain.entity.features.any;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.utils.Logger;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

public class AnySearch implements Feature {

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        if (params.length < 1 || !(params[0] instanceof String)) {
            return () -> new SuccessReport("", false);
        }

        String searchTerm = (String) params[0];
        Path root = project.getRootNode().getPath();
        List<Path> resultFiles = new ArrayList<>();

        try {
            Files.walk(root)
                    .filter(Files::isRegularFile)
                    .forEach(path -> {
                        try {
                            boolean found = Files.lines(path).anyMatch(line -> line.contains(searchTerm));
                            if (found) {
                                resultFiles.add(path);
                            }
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    });
        } catch (IOException e) {
            Logger.logError(e.getMessage());
            return () -> new SuccessReport("", false);
        }

        return () -> new SuccessReport("", !resultFiles.isEmpty());
    }

    public Type type() {
        return Mandatory.Features.Any.SEARCH;
    }
}
