package fr.epita.assistants.myide.domain.entity;

import fr.epita.assistants.MyIde;
import fr.epita.assistants.myide.domain.entity.features.any.AnyCleanup;
import fr.epita.assistants.myide.domain.entity.features.any.AnyDist;
import fr.epita.assistants.myide.domain.entity.features.any.AnyRun;
import fr.epita.assistants.myide.domain.entity.features.any.AnySearch;
import fr.epita.assistants.myide.domain.entity.features.git.GitAdd;
import fr.epita.assistants.myide.domain.entity.features.git.GitCommit;
import fr.epita.assistants.myide.domain.entity.features.git.GitPull;
import fr.epita.assistants.myide.domain.entity.features.git.GitPush;
import fr.epita.assistants.myide.domain.entity.features.maven.*;
import org.eclipse.jgit.api.Git;

import java.util.ArrayList;
import java.util.List;

public class AspectImp implements Aspect{

    private final Type type;
    private final List<Feature> features;
    MyIde.Configuration configuration;
    final Git git;

    public AspectImp(Type type, MyIde.Configuration configuration, Git git) {
        this.type = type;
        this.configuration = configuration;
        this.git = git;
        if(type.equals(Mandatory.Aspects.ANY))
        {
            this.features = List.of(new AnyCleanup(), new AnyDist(), new AnySearch(), new AnyRun());
        }
        else if(type.equals(Mandatory.Aspects.GIT))
        {
            this.features = List.of(new GitAdd(git),new GitCommit(git),new GitPush(git),new GitPull(git));
        }
        else
        {
            this.features = List.of(new MavenCompileImp(),new MavenExecImp(),new MavenInstallImp(),
                    new MavenPackageImp(),new MavenTreeImp(),new MavenTestImp(),new MavenCleanImp());
        }
    }

    @Override
    public Type getType() {
        return this.type;
    }

    @Override
    public List<Feature> getFeatureList() {
        return this.features;
    }

}
