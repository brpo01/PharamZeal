package com.pharmazeal.PharmaZeal.models.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="drugs")
public class Drug {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String drug_name;

    private String condition;

    private String id_check;

    private String availability_stoke;

    private String availability_tunstall;

    private String availability_fenton;

    private String availability_hanley;

    private String availability_longton;

}
