package fr.epita.assistants.myide.domain.entity;

import fr.epita.assistants.myide.domain.entity.Aspect;
import fr.epita.assistants.myide.domain.entity.Feature;
import fr.epita.assistants.myide.domain.entity.Node;
import fr.epita.assistants.myide.domain.entity.Project;
import io.smallrye.common.constraint.NotNull;

import java.util.*;

public class ProjectImpl implements Project {
    private final Node rootNode;
    private final Set<Aspect> aspects;

    public ProjectImpl(@NotNull Node rootNode, @NotNull Set<Aspect> aspects) {
        this.rootNode = rootNode;
        this.aspects = aspects;
    }

    @Override
    public @NotNull Node getRootNode() {
        return this.rootNode;
    }

    @Override
    public @NotNull Set<Aspect> getAspects() {
        return this.aspects;
    }

    // Implementation of getFeature method
    @Override
    public @NotNull Optional<Feature> getFeature(@NotNull Feature.Type featureType) {
        return this.aspects.stream()
                .flatMap(aspect -> aspect.getFeatureList().stream())
                .filter(feature -> feature.type().equals(featureType))
                .findFirst();
    }
}
