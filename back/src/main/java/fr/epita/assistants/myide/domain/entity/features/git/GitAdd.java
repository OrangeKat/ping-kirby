package fr.epita.assistants.myide.domain.entity.features.git;

import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Mandatory;
import fr.epita.assistants.myide.domain.entity.Project;
import fr.epita.assistants.myide.utils.Logger;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;

import java.io.File;
import java.util.Arrays;

public class GitAdd implements Feature{
    final Git git;

    public GitAdd(Git git) {
        this.git = git;
    }

    @Override
    public Feature.ExecutionReport execute(Project project, Object... params) {
        try {
            var path = project.getRootNode().getPath();
            var gitadd = git.add();
            for(var p : params)
            {
                var f = new File(path+File.separator+p.toString());
                if(!f.exists())
                {
                    return () -> new SuccessReport("", false);
                }
                gitadd.addFilepattern(p.toString());
            }
            gitadd.call();
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
        return Mandatory.Features.Git.ADD;
    }
}
