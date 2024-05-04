package com.pharmazeal.PharmaZeal.dto.responses;


import com.pharmazeal.PharmaZeal.models.entities.Customer;
import com.pharmazeal.PharmaZeal.models.entities.Store;
import com.pharmazeal.PharmaZeal.models.entities.User;
import com.pharmazeal.PharmaZeal.models.entities.Drug;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class SalesResponseDTO {

    private final int id;

    private final int customer;

    private final String full_name;

    private final String gender;

    private final String address;

    private final String medical_history;

    private final String mobileNumber;

    private final int user;

    private final String firstname;

    private final int quantity;

    private final double total_price;

    private final int store;

    private final String name;

    private List<DrugResponseDTO> drugs;

    private final LocalDate date_of_sale;

}
