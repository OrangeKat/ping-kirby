package fr.epita.assistants.myide.domain.entity.features.git;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.utils.Logger;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;

import java.util.Arrays;

public class GitPull  implements Feature {
    final Git git;

    public GitPull(Git git) {
        this.git = git;
    }

    @Override
    public Feature.ExecutionReport execute(Project project, Object... params) {
        try {
            git.pull().call();
            return ()-> new SuccessReport("", true);
        }
        catch (GitAPIException e)
        {
            Logger.logError(e.getMessage());
            return ()-> new SuccessReport("", false);
        }
    }

    @Override
    public Feature.Type type() {
        return Mandatory.Features.Git.PULL;
    }
}
