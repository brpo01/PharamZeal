package com.pharmazeal.PharmaZeal.dto.responses;


import lombok.*;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class CustomerResponseDTO {
    private final int id;

    private final String full_name;

    private final String firstname;

    private final String lastname;

    private final String gender;

    private final String address;

    private final String store_name;

    private final String postcode;

    private final String medical_history;

    private final String allergy;

    private final LocalDate date_of_birth;

    private final String mobileNumber;

    private List<SalesResponseDTO> sales;
}
