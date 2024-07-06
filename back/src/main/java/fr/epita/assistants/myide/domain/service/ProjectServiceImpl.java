package fr.epita.assistants.myide.domain.service;

import com.tngtech.archunit.lang.ArchRule;
import fr.epita.assistants.MyIde;
import fr.epita.assistants.myide.domain.entity.*;
import fr.epita.assistants.myide.domain.service.NodeService;
import fr.epita.assistants.myide.domain.service.ProjectService;
import io.smallrye.common.constraint.NotNull;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
@ApplicationScoped
public class ProjectServiceImpl implements ProjectService {
    private final NodeService nodeService;

    MyIde.Configuration configuration;

    public ProjectServiceImpl(MyIde.Configuration configuration) {
        this.nodeService = new NodeServiceImpl();
        this.configuration = configuration;
    }

    public ProjectServiceImpl() {
        this.nodeService = new NodeServiceImpl();
        File folder = new File(".myIde");
        File file = new File(folder, "index");
        try {
            if (!folder.isDirectory()) {
                Files.createDirectories(folder.toPath());
            }
            if (!file.isFile()) {
                Files.createFile(file.toPath());
            }
        } catch (Exception error) {
            System.out.println("Something went wrong when creating a Project Service");
        }

        this.configuration = new MyIde.Configuration(file.toPath(), folder.toPath());
    }

    public void loadChildren(Node node) {
        if (node.getType() == Node.Types.FOLDER) {
            node.getChildren().clear();
            var list = node.getPath().toFile().listFiles();
            if (list == null) {
                return;
            }
            for (var file : list) {
                if (file.isDirectory()) {
                    Node root = new NodeImpl(file.getName(), file.toPath(), Node.Types.FOLDER, node, new ArrayList<>());
                    node.getChildren().add(root);
                    loadChildren(root);
                } else if (file.isFile()) {
                    node.getChildren().add(new NodeImpl(file.getName(), file.toPath(), Node.Types.FILE, node, new ArrayList<>()));
                }
            }
        }
    }



    @Override
    public @NotNull Project load(@NotNull final Path root) {
        if (!Files.exists(root) || !Files.isDirectory(root)) {
            throw new IllegalArgumentException("Invalid project root path");
        }

        Set<Aspect> aspects = new HashSet<Aspect>();
        aspects.add(new AspectImp(Mandatory.Aspects.ANY, configuration, null));

        String name = root.getFileName().toString();
        Node node = new NodeImpl(name, root, Node.Types.FOLDER, null, new ArrayList<>());
        loadChildren(node);

        File maven = new File(root.toString(), "pom.xml");
        if (maven.exists()) {
            aspects.add(new AspectImp(Mandatory.Aspects.MAVEN, configuration, null));
        }

        Path pathToGit = root.resolve(".git/");
        File gitFolder = pathToGit.toFile();
        if (gitFolder.exists() && gitFolder.isDirectory()) {
            FileRepositoryBuilder f_builder = new FileRepositoryBuilder();
            Repository repo;
            try {
                repo = f_builder.setGitDir(gitFolder).readEnvironment().findGitDir().build();
                aspects.add(new AspectImp(Mandatory.Aspects.GIT, configuration, new Git(repo)));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        return new ProjectImpl(node, aspects);
    }

    @Override
    public @NotNull Feature.ExecutionReport execute(@NotNull final Project project,
                                                    @NotNull final Feature.Type featureType,
                                                    final Object... params) {
        Optional<Feature> featureOptional = project.getFeature(featureType);

        if (featureOptional.isPresent()) {
            Feature feature = featureOptional.get();
            return feature.execute(project, params);
        } else {
            throw new IllegalArgumentException("Feature not found in project");
        }
    }

    @Override
    public @NotNull NodeService getNodeService() {
        return this.nodeService;
    }

}
