package com.pharmazeal.PharmaZeal.dto.factories;

import com.pharmazeal.PharmaZeal.dto.responses.AddressResponseDTO;
import com.pharmazeal.PharmaZeal.dto.responses.DefaultResponseDTO;
import com.pharmazeal.PharmaZeal.dto.responses.UserResponseDTO;
import com.pharmazeal.PharmaZeal.models.entities.Address;
import com.pharmazeal.PharmaZeal.models.entities.User;
import com.pharmazeal.PharmaZeal.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class User_DTO_Factory {

    @Autowired
    private JwtUtil jwtUtil;

    public DefaultResponseDTO createUserListResponseDTO(List<UserResponseDTO> data) {
        DefaultResponseDTO response = new DefaultResponseDTO();
        response.setStatusCode(200);
        response.setMessage("Users fetched successfully.");
        response.setData(data);

        return response;
    }

    public DefaultResponseDTO createUserResponseDTO(User user, String message)
    {
        UserResponseDTO userDTO = new UserResponseDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmailAddress(),
                user.getPhoneNumber(),
                user.getRole(),
                user.getStore()
        );

        userDTO.setAddresses(createDTOCollection(user.getAddresses()));

        DefaultResponseDTO response = new DefaultResponseDTO();
        response.setStatusCode(200);
        response.setMessage(message);

        Map<String, Object> data = new HashMap<>();
        data.put("apiToken", jwtUtil.generateToken(user));
        data.put("user", userDTO);
        response.setData(data);;

        return response;
    }

    public UserResponseDTO createDTO(User user)
    {
        UserResponseDTO userDTO = new UserResponseDTO(
                       user.getId(),
                       user.getFirstName(),
                       user.getLastName(),
                       user.getEmailAddress(),
                       user.getPhoneNumber(),
                       user.getRole(),
                       user.getStore()
                );

        userDTO.setAddresses(createDTOCollection(user.getAddresses()));

        return userDTO;
    }

    private List<AddressResponseDTO> createDTOCollection(List<Address> addresses)
    {
        return addresses.stream().map(this::createAddressDTO).collect(Collectors.toCollection(ArrayList::new));
    }

    public AddressResponseDTO createAddressDTO(Address address)
    {
        return new AddressResponseDTO(
                address.getId(),
                address.getAddressLine()
        );

    }
}
