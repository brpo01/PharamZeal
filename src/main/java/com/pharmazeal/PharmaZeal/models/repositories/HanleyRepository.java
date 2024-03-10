package com.pharmazeal.PharmaZeal.models.repositories;

import com.pharmazeal.PharmaZeal.models.entities.Hanley;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HanleyRepository extends JpaRepository<Hanley, Integer> {
    Hanley findById(int id);
}
