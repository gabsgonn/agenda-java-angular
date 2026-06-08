package com.gabrielgon.agenda.repository;

import com.gabrielgon.agenda.domain.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
}
