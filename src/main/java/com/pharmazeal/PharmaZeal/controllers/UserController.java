package com.pharmazeal.PharmaZeal.controllers;

import com.pharmazeal.PharmaZeal.dto.responses.DefaultResponseDTO;
import com.pharmazeal.PharmaZeal.dto.requests.LoginUserRequestDTO;
import com.pharmazeal.PharmaZeal.services.UserService;
import com.pharmazeal.PharmaZeal.dto.requests.NewUserRequestDTO;
import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import javax.servlet.http.HttpServletRequest;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping( "/users")
@AllArgsConstructor
@Validated
public class UserController {

    private UserService userService;

    @GetMapping("hello")
    public String helloWorld() {
        return "Hello Worlds!!";
    }

    @PostMapping("create")
    public DefaultResponseDTO createUser(@Valid @RequestBody NewUserRequestDTO data) {
        return this.userService.createUser(data);
    }

    @PostMapping("login")
    public DefaultResponseDTO loginUser(@Valid @RequestBody LoginUserRequestDTO data) {
        return this.userService.loginUser(data);
    }

    @GetMapping("me")
    public DefaultResponseDTO getDetails(HttpServletRequest request) {
        return this.userService.getUserDetails(request);
    }

    @GetMapping("/all")
    public DefaultResponseDTO getAllUsers() {
        return this.userService.getAllUsers();
    }

    @DeleteMapping("{id}")
    public DefaultResponseDTO deleteUser(@PathVariable(name = "id") int id) {
        return this.userService.deleteUser(id);
    }

}
