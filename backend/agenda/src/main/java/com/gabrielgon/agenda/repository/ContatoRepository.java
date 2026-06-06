package com.gabrielgon.agenda.repository;

import com.gabrielgon.agenda.domain.Contato;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContatoRepository extends JpaRepository<Contato, Long> {

}
