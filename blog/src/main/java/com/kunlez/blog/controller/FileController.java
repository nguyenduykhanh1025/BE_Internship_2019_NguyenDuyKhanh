package com.kunlez.blog.controller;

import com.kunlez.blog.common.CommonMethot;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Secured("ROLE_MEMBER")
@RestController
@RequestMapping("/api/file")
public class FileController {

    // Save Files
    @Secured("ROLE_MEMBER")
    @PostMapping("/upfile")
    public void multiUploadFileModel(@RequestParam("files") MultipartFile[] uploadfiles, HttpServletRequest request) throws IOException {
        String UPLOAD_DIR = System.getProperty("user.dir") + "\\src\\main\\upload\\static\\images\\gallery\\";
        this.saveUploadedFiles(uploadfiles, UPLOAD_DIR);
    }

    private void saveUploadedFiles(MultipartFile[] files, String UPLOAD_DIR) throws IOException {

        for (MultipartFile file : files) {

            if (file.isEmpty()) {
                continue;
            }

            String uploadFilePath = UPLOAD_DIR + CommonMethot.getLinkImgFollowFormat(CommonMethot.getUserName(), file.getOriginalFilename());
            byte[] bytes = file.getBytes();
            Path path = Paths.get(uploadFilePath);
            System.out.println(uploadFilePath);
            Files.write(path, bytes);
        }
    }
}
