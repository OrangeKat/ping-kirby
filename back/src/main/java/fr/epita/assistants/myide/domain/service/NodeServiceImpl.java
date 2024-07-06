package fr.epita.assistants.myide.domain.service;

import fr.epita.assistants.myide.domain.entity.Node;
import fr.epita.assistants.myide.domain.entity.NodeImpl;
import fr.epita.assistants.myide.domain.entity.ProjectFile;
import fr.epita.assistants.myide.utils.Logger;
import jakarta.enterprise.context.ApplicationScoped;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@ApplicationScoped
public class NodeServiceImpl implements NodeService{
    public NodeServiceImpl() {}

    public Node update(Node node, byte[] insertedContent) {
        if (node.isFolder()) {
            throw new IllegalArgumentException("Node is not a file.");
        }

        Path filePath = node.getPath();
        try (RandomAccessFile file = new RandomAccessFile(filePath.toFile(), "rw")) {
            file.setLength(0);
            file.write(insertedContent);
        } catch (IOException e) {
            throw new UnsupportedOperationException(e);
        }
        return node;
    }

    public boolean delete(Node node) {
        try {
            if (node.isFolder()) {
                FileUtils.deleteDirectory(node.getPath().toFile());
            } else {
                var parent = ((NodeImpl) node).getParent();
                if (parent != null) {
                    parent.getChildren().remove(node);
                }
                return node.getPath().toFile().delete();
            }
            return true;
        }
        catch (IOException e) {
            Logger.logError(e.getMessage());
            return false;
        }
    }

    public Node create(Node folder, String name, Node.Type type) {
        if (folder != null && folder.isFile()) {
            throw new IllegalArgumentException("Node is not a folder");
        }

        if (folder == null) {
            return new NodeImpl(name, new File(name).toPath(), (Node.Types) type, null, new ArrayList<>());
        }
        else {
            Node child = new NodeImpl(name, new File(name).toPath(), (Node.Types) type, null, new ArrayList<>());
            try {
                if (type == Node.Types.FILE) {
                    Files.createFile(folder.getPath().resolve(name));
                }
                else if (type == Node.Types.FOLDER) {
                    Files.createDirectories(folder.getPath().resolve(name));
                }
                else {
                    throw new IllegalArgumentException("Unknown type");
                }
            }
            catch (IOException e) {
                throw new UnsupportedOperationException("Could not create node");
            }
            folder.getChildren().add(child);
            return child;
        }
    }

    public void moveChildren(Node parent) {
        for (var child : parent.getChildren()) {
            ((NodeImpl) child).setPath(parent.getPath().resolve(child.getPath().getFileName()));
            moveChildren(child);
        }
    }
    public Node move(Node nodeToMove, Node destinationFolder) {
        if (nodeToMove == null || destinationFolder == null) {
            throw new IllegalArgumentException("src or dst is null");
        }
        if (destinationFolder.isFile()) {
            throw new UnsupportedOperationException("Cannot move file into a file");
        }
        Node src_parent = ((NodeImpl) nodeToMove).getParent();
        src_parent.getChildren().remove(nodeToMove);
        destinationFolder.getChildren().add(nodeToMove);
        try {
            FileUtils.moveToDirectory(nodeToMove.getPath().toFile(), destinationFolder.getPath().toFile(), false);
            ((NodeImpl) nodeToMove).setPath(destinationFolder.getPath().resolve(nodeToMove.getPath().getFileName()));
            moveChildren(nodeToMove);
        }
        catch (IOException e) {
            throw new UnsupportedOperationException(e);
        }
        return nodeToMove;
    }

    public Node searchNode(Node root, Path path) {
        for (var child : root.getChildren()) {
            if (path.toString().equals(child.getPath().toString())) {
                return child;
            }
        }
        throw new IllegalArgumentException("Invalid root");
    }

    public ProjectFile OpenFile(Node root, String filename) {
        for (var node : root.getChildren()) {
            if (node.getPath().toFile().getName().equals(filename)) {
                String name = node.getPath().toFile().getName();
                String content = null;
                try {
                    content = Files.readString(node.getPath());
                }
                catch (IOException e) {
                }
                return new ProjectFile(name, node.getPath().getParent().toString(), content, new ArrayList<>(), true);
            }
        }
        return null;
    }

    public List<ProjectFile> getFiles (Node root, List<ProjectFile> ListFile) throws IOException {
        for (var node : root.getChildren()) {
            if (node.isFile()) {
                String name = node.getPath().toFile().getName();
                String content = null;
                try {
                    content = Files.readString(node.getPath());
                }
                catch (IOException e) {
                }
                ProjectFile file = new ProjectFile(name, node.getPath().getParent().toString(), content, new ArrayList<>(), true);
                ListFile.add(file);
            }
            else {
                ListFile = getFiles(node, ListFile);
            }
        }
        return ListFile;
    }

    public ProjectFile makeFileTree (Node root) throws IOException {
        List<ProjectFile> children = new ArrayList<>();
        for (var node : root.getChildren()) {
            if (node.isFile()) {
                String name = node.getPath().toFile().getName();
                String content = null;
                try {
                    content = Files.readString(node.getPath());
                }
                catch (IOException e) {
                }
                ProjectFile file = new ProjectFile(name, node.getPath().getParent().toString(), content, new ArrayList<>(), true);
                children.add(file);
            }
            else {
                children.add(makeFileTree(node));
            }
        }
        String name = root.getPath().toFile().getName();
        return new ProjectFile(name, root.getPath().getParent().toString(), null, children, false);
    }
}
