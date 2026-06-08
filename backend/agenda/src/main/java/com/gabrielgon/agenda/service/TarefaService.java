package com.gabrielgon.agenda.service;

import com.gabrielgon.agenda.domain.Tarefa;
import com.gabrielgon.agenda.domain.enums.StatusTarefa;
import com.gabrielgon.agenda.repository.TarefaRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TarefaService  {

    private final TarefaRepository repo;

    public TarefaService(TarefaRepository repo) {
        this.repo = repo;
    }

    @Transactional
    public List<Tarefa> getAll() {
        return repo.findAll();
    }

    public Tarefa save(Tarefa tarefa) {
        return repo.save(tarefa);
    }

    // concluir tarefa
    public Tarefa finishTarefa(Long id) {
        return repo.findById(id).map(tarefa -> {
            tarefa.setStatus(StatusTarefa.CONCLUIDA);
            tarefa.setDataConclusao(LocalDateTime.now());
            return repo.save(tarefa);

        }).orElseThrow(() -> new RuntimeException("Não foi possível concluir a tarefa"));
    }

    @Transactional
    public Optional<Tarefa> getById(Long id) {
        return repo.findById(id);
    }

    public void deleteById(Long id) {
        repo.deleteById(id);
    }

    public Tarefa update(Long id, Tarefa updatedTarefa) {
        return repo.findById(id).map(tarefa -> {

            // Bloqueia alterações se a tarefa já estiver concluída ou cancelada
            if (tarefa.getStatus() == StatusTarefa.CONCLUIDA) {
                throw new IllegalStateException("Não é possível editar uma tarefa já concluída.");
            }

            tarefa.setTitulo(updatedTarefa.getTitulo());
            tarefa.setDescricao(updatedTarefa.getDescricao());
            tarefa.setData(updatedTarefa.getData());
            tarefa.setHorario(updatedTarefa.getHorario());
            tarefa.setPrioridade(updatedTarefa.getPrioridade());
            tarefa.setContatos(updatedTarefa.getContatos());

            return tarefa;
        }).orElseThrow(() -> new RuntimeException("Algum dos parâmetros estão incorretos"));
    }

    // Específico para transição de colunas (Ex: Pendente -> Em Andamento)
    public Tarefa updateStatus(Long id, StatusTarefa novoStatus) {
        return repo.findById(id).map(tarefa -> {
            // Regra de negócio: impede reabrir tarefa concluída por este endpoint
            if (tarefa.getStatus() == StatusTarefa.CONCLUIDA) {
                throw new IllegalStateException("Use o método correto para reabrir tarefas concluídas.");
            }

            tarefa.setStatus(novoStatus);
            return save(tarefa);
        }).orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
    }

    public Tarefa reopenTarefa(Long id) {
        return repo.findById(id).map(tarefa -> {
            // Validação: só faz sentido reabrir se ela estiver realmente concluída
            if (tarefa.getStatus() != StatusTarefa.CONCLUIDA) {
                throw new IllegalStateException("Apenas tarefas concluídas podem ser reabertas.");
            }

            // Regra de Negócio para desfazer a conclusão:
            tarefa.setStatus(StatusTarefa.EM_ANDAMENTO); // ou PENDENTE, dependendo do seu fluxo
            tarefa.setDataConclusao(null); // Remove o carimbo de data/hora antigo

            return tarefa;
        }).orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
    }


}
