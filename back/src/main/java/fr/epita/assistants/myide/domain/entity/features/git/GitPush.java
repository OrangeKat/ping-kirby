package fr.epita.assistants.myide.domain.entity.features.git;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.utils.Logger;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.transport.RemoteRefUpdate;

public class GitPush  implements Feature {
    final Git git;

    public GitPush(Git git) {
        this.git = git;
    }

    @Override
    public Feature.ExecutionReport execute(Project project, Object... params) {
        try {
            var PushResults= git.push().call();
            for(var res : PushResults)
            {
                for (var update : res.getRemoteUpdates()) {
                    if(update.getStatus() != RemoteRefUpdate.Status.OK)
                    {
                        return () -> new SuccessReport("", false);
                    }
                }
            }
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
        return Mandatory.Features.Git.PUSH;
    }
}