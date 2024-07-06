package fr.epita.assistants.myide.domain.entity.features.git;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.utils.Logger;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;

import java.lang.reflect.Array;
import java.util.Arrays;

public class GitCommit implements Feature {

    final Git git;

    public GitCommit(Git git) {
        this.git = git;
    }

    @Override
    public ExecutionReport execute(Project project, Object... params) {
        try {
            git.commit().setMessage(Arrays.toString(params)).call();
            return ()-> new SuccessReport("", true);
        }
        catch (GitAPIException e)
        {
            Logger.logError(e.getMessage());
        }
        return ()-> new SuccessReport("", false);
    }

    @Override
    public Type type() {
        return Mandatory.Features.Git.COMMIT;
    }
}
