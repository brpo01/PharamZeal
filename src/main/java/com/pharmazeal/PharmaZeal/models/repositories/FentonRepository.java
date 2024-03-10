package com.pharmazeal.PharmaZeal.models.repositories;

import com.pharmazeal.PharmaZeal.models.entities.Fenton;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FentonRepository extends JpaRepository<Fenton, Integer> {
    Fenton findById(int id);
}
