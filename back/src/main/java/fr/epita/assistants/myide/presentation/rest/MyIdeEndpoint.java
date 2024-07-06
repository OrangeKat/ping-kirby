package fr.epita.assistants.myide.presentation.rest;

import fr.epita.assistants.myide.domain.entity.*;
import fr.epita.assistants.myide.domain.service.NodeServiceImpl;
import fr.epita.assistants.myide.domain.service.ProjectService;
import fr.epita.assistants.myide.domain.service.ProjectServiceImpl;
import fr.epita.assistants.myide.presentation.rest.reponse.OpenResponse;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import fr.epita.assistants.myide.utils.Logger;
import fr.epita.assistants.myide.presentation.rest.request.DefaultRequest;
import fr.epita.assistants.myide.presentation.rest.request.ExecFeatureRequest;
import fr.epita.assistants.myide.presentation.rest.request.MoveRequest;
import fr.epita.assistants.myide.presentation.rest.request.UpdateRequest;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Path("/api")
@ApplicationScoped
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class MyIdeEndpoint {

    @Inject
    ProjectServiceImpl projectService;

    @Inject
    NodeServiceImpl nodeService;

    @GET @Path("/hello")
    public Response helloWorld()
    {
        Logger.log("Saying hello !");
        return Response.ok("Hello World !").build();
    }

    @POST @Path("/open/project")
    public Response openProject(DefaultRequest request) throws IOException {
        Logger.log("Opening project: " + request.path);
        if (request.path == null || request.path.isEmpty()) {
            return Response.status(400).build();
        }
        Project project = projectService.load(Paths.get(request.path));
        if (project == null) {
            throw new RuntimeException("Project not opened");
        }
        var FileTree = nodeService.makeFileTree(project.getRootNode());
        var ListFiles = nodeService.getFiles(project.getRootNode(), new ArrayList<>());
        OpenResponse resp = new OpenResponse(new ProjectFile("", "", "", new ArrayList<>(), true), FileTree, ListFiles, project.getAspects());
        return Response.ok(resp).build();
    }

    @POST @Path("/open/file")
    public Response openFile(DefaultRequest request) throws IOException {
        Logger.log("Opening file: " + request.path);
        if (request.path == null || request.path.isEmpty()) {
            return Response.status(400).build();
        }
        Project project = projectService.load(Paths.get(request.path).getParent());
        if (project == null) {
            throw new RuntimeException("Project not opened");
        }
        Node root = project.getRootNode();
        Node file = nodeService.searchNode(root, Paths.get(request.path));
        if (file.isFolder()) {
            return Response.status(404).build();
        }
        ProjectFile ProjectFile = nodeService.OpenFile(project.getRootNode(), file.getPath().toFile().getName());
        OpenResponse resp = new OpenResponse(ProjectFile, null, null, project.getAspects());
        return Response.ok(resp).build();
    }

    @POST @Path("/create/file")
    public Response createFile(DefaultRequest request)
    {
        Logger.log("Creating file: " + request.path);
        if (request.path == null || request.path.isEmpty()) {
            return Response.status(400).build();
        }
        Project project = projectService.load(Paths.get(request.path).getParent());
        Node root = project.getRootNode();
        Node newFile = nodeService.create(root, Paths.get(request.path).getFileName().toString(), Node.Types.FILE);
        return Response.ok(newFile).build();
    }

    @POST @Path("/create/folder")
    public Response createFolder(DefaultRequest request)
    {
        Logger.log("Creating folder: " + request.path);
        if (request.path == null || request.path.isEmpty()) {
            return Response.status(400).build();
        }
        Project project = projectService.load(Paths.get(request.path).getParent());
        Node root = project.getRootNode();
        Node newFolder = nodeService.create(root, Paths.get(request.path).getFileName().toString(), Node.Types.FOLDER);
        return Response.ok(newFolder).build();
    }

    @POST @Path("/delete/file")
    public Response deleteFile(DefaultRequest request)
    {
        Logger.log("Deleting file: " + request.path);
        if (request.path == null || request.path.isEmpty()) {
            return Response.status(400).build();
        }
        Project project = projectService.load(Paths.get(request.path).getParent());
        if (project == null) {
            throw new RuntimeException("Project not opened");
        }
        Node root = project.getRootNode();
        Node file = nodeService.searchNode(root, Paths.get(request.path));
        Boolean isDel = nodeService.delete(file);
        return Response.ok(isDel).build();
    }

    @POST @Path("/delete/folder")
    public Response deleteFolder(DefaultRequest request)
    {
        Logger.log("Deleting folder: " + request.path);
        if (request.path == null || request.path.isEmpty()) {
            return Response.status(400).build();
        }
        Project project = projectService.load(Paths.get(request.path));
        Node root = project.getRootNode();
        Boolean isDel = nodeService.delete(root);
        return Response.ok(isDel).build();
    }

    @POST @Path("/run/file")
    public Response runFile(ExecFeatureRequest request) {
        Logger.log("Trying to run file: " + request.project);
        Project project = projectService.load(Paths.get(request.project).getParent());
        List<Feature> features = project.getFeatures();
        for (Feature feat: features) {
            if (feat.type().toString().equals(request.feature)) {
                Feature.ExecutionReport report = projectService.execute(project, feat.type(), request.params);
                return Response.ok(report).build();
            }
        }
        return Response.status(404).build();
    }

    @POST @Path("/run/folder")
    public Response runFolder(ExecFeatureRequest request) {
        Logger.log("Trying to run file: " + request.project);
        Project project = projectService.load(Paths.get(request.project));
        List<Feature> features = project.getFeatures();
        for (Feature feat: features) {
            if (feat.type().toString().equals(request.feature)) {
                Feature.ExecutionReport report = projectService.execute(project, feat.type(), request.params);
                return Response.ok(report).build();
            }
        }
        return Response.status(404).build();
    }

    @POST @Path("/execFeature")
    public Response execFeature(ExecFeatureRequest request)
    {
        Logger.log("Executing feature: " + request.feature + " on project " + request.project);
        Project project = projectService.load(Paths.get(request.project));
        if (project == null) {
            throw new RuntimeException("Project not opened");
        }

        List<Feature> features = project.getFeatures();
        for (Feature feat: features) {
            if (feat.type().toString().equals(request.feature)) {
                Feature.ExecutionReport report = projectService.execute(project, feat.type(), request.params);
                return Response.ok(report).build();
            }
        }
        Logger.logError("Feature Not found");
        return Response.status(404).build();
    }

    @POST @Path("/move")
    public Response move(MoveRequest request)
    {
        Logger.log("Moving: from " + request.src + " to " + request.dst);
        Project src_project = projectService.load(Paths.get(request.src).getParent());
        Project dst_project = projectService.load(Paths.get(request.dst));
        Node src_root = src_project.getRootNode();
        Node src = nodeService.searchNode(src_root, Paths.get(request.src));
        Node toMove = nodeService.move(src, dst_project.getRootNode());
        return Response.ok((toMove != null)).build();
    }

    @POST @Path("/update")
    public Response update(UpdateRequest request)
    {
        Logger.log("Updating: " + request.path);
        Project project = projectService.load(Paths.get(request.path).getParent());
        Node root = project.getRootNode();
        Node toUpdate = nodeService.searchNode(root, Paths.get(request.path));
        Node updated = nodeService.update(toUpdate, request.content.getBytes(StandardCharsets.UTF_8));
        return Response.ok(updated != null).build();
    }
}