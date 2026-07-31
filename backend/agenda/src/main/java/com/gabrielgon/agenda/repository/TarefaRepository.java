package com.gabrielgon.agenda.repository;

import com.gabrielgon.agenda.domain.Tarefa;
import com.gabrielgon.agenda.domain.enums.Prioridade;
import com.gabrielgon.agenda.domain.enums.StatusTarefa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

    @Query("SELECT t FROM Tarefa t WHERE " +
            "(:busca IS NULL OR LOWER(t.titulo) LIKE LOWER(CONCAT('%', :busca, '%'))) AND " +
            "(:status IS NULL OR t.status IN :status) AND " +
            "(:prioridade IS NULL OR t.prioridade IN :prioridade) AND " +
            "(CAST(:dataInicio AS date) IS NULL OR t.dataVencimento >= :dataInicio) AND " +
            "(CAST(:dataFim AS date) IS NULL OR t.dataVencimento <= :dataFim)")
    List<Tarefa> buscarComFiltrosDinamicamente(
            @Param("busca") String busca,
            @Param("status") List<StatusTarefa> status,
            @Param("prioridade") List<Prioridade> prioridade,
            @Param("dataInicio")LocalDate dataInicio,
            @Param("dataFim") String dataFim
            );
}