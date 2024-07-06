package fr.epita.assistants.myide.domain.entity;

import fr.epita.assistants.myide.utils.Given;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.LinkedList;
import java.util.List;

@AllArgsConstructor
public class NodeImpl implements Node {
    String name;
    Path path;
    Types type;
    @Getter
    Node parent;
    List<Node> children;

    @Override
    public Path getPath() {
        return path;
    }

    @Override
    public Type getType() {
        return type;
    }

    @Override
    public List<@NotNull Node> getChildren() {
        return children;
    }

    public void setPath(Path p) {
        path = Paths.get(p.toString(), name);
    }



    public void rename(String newName){
        name = newName;
        path = Paths.get(path.getParent().toString(), newName);
    }
}
