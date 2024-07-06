package fr.epita.assistants.myide.domain.entity.features.any;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.utils.Logger;
import io.smallrye.common.constraint.NotNull;
import jakarta.enterprise.context.ApplicationScoped;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@ApplicationScoped
public class AnyCleanup implements Feature {
    @Override
    public ExecutionReport execute(Project project, Object... params) {
        Path root = project.getRootNode().getPath();
        Path ignoreFile = root.resolve(".myideignore");

        if (!Files.exists(ignoreFile) || !Files.isRegularFile(ignoreFile)) {
            return () -> new SuccessReport("", false);
        }

        try {
            Set<String> ignoreList = new HashSet<>(Files.readAllLines(ignoreFile));

            Files.walk(root)
                    .sorted((path1, path2) -> path2.getNameCount() - path1.getNameCount())
                    .forEach(path -> {
                        try {
                            File file = path.toFile();

                            if (ignoreList.contains(file.getName())) {
                                if (file.isDirectory()) {
                                    FileUtils.deleteDirectory(file);
                                } else if (file.isFile()) {
                                    Files.delete(file.toPath());
                                }
                            }
                        } catch (IOException e) {
                            throw new RuntimeException("Error deleting file or directory: " + path, e);
                        }
                    });

            return () -> new SuccessReport("", true);
        } catch (IOException e) {
            Logger.logError(e.getMessage());
            return () -> new SuccessReport("", false);
        }
    }

    @Override
    public Type type() {
        return Mandatory.Features.Any.CLEANUP;
    }
}
