package fr.epita.assistants.myide.domain.entity.features.any;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.utils.Logger;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashSet;
import java.util.Set;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class AnyDist implements Feature {
    private void cleanupProjectDirectory(Path root, Set<String> ignoreList) throws IOException {
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
    }

    private void createZipArchive(Path root) throws IOException {
        String projectName = root.getFileName().toString();
        Path zipFile = root.resolveSibling(projectName + ".zip");

        try (ZipOutputStream zos = new ZipOutputStream(Files.newOutputStream(zipFile))) {
            Files.walk(root)
                    .filter(Files::isRegularFile)
                    .forEach(path -> {
                        try {
                            ZipEntry zipEntry = new ZipEntry(root.relativize(path).toString());
                            zos.putNextEntry(zipEntry);
                            Files.copy(path, zos);
                            zos.closeEntry();
                        } catch (IOException e) {
                            throw new RuntimeException("Error adding file to zip archive: " + path, e);
                        }
                    });
        }
    }
    @Override
    public ExecutionReport execute(Project project, Object... params) {
        Path root = project.getRootNode().getPath();
        Path ignoreFile = root.resolve(".myideignore");

        if (!Files.exists(ignoreFile) || !Files.isRegularFile(ignoreFile)) {
            return () -> new SuccessReport("", false);
        }

        try {
            Set<String> ignoreList = new HashSet<>(Files.readAllLines(ignoreFile));

            cleanupProjectDirectory(root, ignoreList);

            createZipArchive(root);

            return () -> new SuccessReport("", true);
        } catch (IOException e) {
            Logger.logError(e.getMessage());
            return () -> new SuccessReport("", false);
        }
    }

    @Override
    public Type type() {
        return Mandatory.Features.Any.DIST;
    }
}
