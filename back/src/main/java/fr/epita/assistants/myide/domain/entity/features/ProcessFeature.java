package fr.epita.assistants.myide.domain.entity.features;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.utils.Logger;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

public abstract class ProcessFeature implements Feature {
    public ExecutionReport launchProcess(final Project project, List<String> args) {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder(args)
                    .directory(project.getRootNode().getPath().toFile());
            Process process = processBuilder.start();
            return () -> {
                try {
                    process.waitFor();

                    BufferedReader reader;
                    if (process.exitValue() == 0) {
                        reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
                    }
                    else {
                        reader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
                    }
                    String msg = "";
                    String line;
                    while ((line = reader.readLine()) != null) {
                        msg += line;
                    }
                    return new SuccessReport(msg, process.exitValue() == 0);
                } catch (InterruptedException e) {
                    Logger.logError(e.getMessage());
                    Thread.currentThread().interrupt();
                    return new SuccessReport(e.getMessage(), false);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            };
        } catch (IOException e) {
            Logger.logError(e.getMessage());
            return () -> new SuccessReport(e.getMessage(), false);
        }
    }
}
