package com.pharmazeal.PharmaZeal.dto.requests;

import lombok.*;

import javax.validation.constraints.Past;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@AllArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class NewCustomerRequestDTO {

    @NotBlank(message = "Full name cannot be blank")
    private String full_name;

    @NotBlank(message = "First name cannot be blank")
    private String firstname;

    @NotBlank(message = "Last name cannot be blank")
    private String lastname;

    @NotBlank(message = "Gender cannot be blank")
    private String gender;

    @NotBlank(message = "Address cannot be blank")
    private String address;

    @NotBlank(message = "Store name cannot be blank")
    private String store_name;

    @NotBlank(message = "Postcode cannot be blank")
    private String post_code;

    @NotBlank(message = "Medical History cannot be blank")
    private String medical_history;

    @NotBlank(message = "Allergy cannot be blank")
    private String allergy;

    @Past(message = "date of birth must be before today")
    private LocalDate date_of_birth;

    @NotBlank(message = "Mobile number cannot be blank")
    private String mobileNumber;
}
