package com.pharmazeal.PharmaZeal.dto.responses;


import com.pharmazeal.PharmaZeal.models.entities.Role;
import com.pharmazeal.PharmaZeal.models.entities.Store;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class UserResponseDTO {
    private final int id;

    private final String firstName;

    private final String lastName;

    private final String emailAddress;

    private final String phoneNumber;

    private final Role role;

    private final Store store;

//    private final String name;
//
//    private final String address;

    private List<AddressResponseDTO> addresses;
}
