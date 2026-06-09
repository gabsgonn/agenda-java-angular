package com.gabrielgon.agenda.controller;

import com.gabrielgon.agenda.domain.Tarefa;
import com.gabrielgon.agenda.domain.enums.StatusTarefa;
import com.gabrielgon.agenda.service.TarefaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tasks")
public class TarefaController {

    private final TarefaService service;

    public TarefaController(TarefaService service) {
        this.service = service;
    }

    @PostMapping
    public Tarefa create(@RequestBody Tarefa tarefa) {
        return service.save(tarefa);
    }

    @GetMapping
    public List<Tarefa> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tarefa> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Tarefa update(@PathVariable Long id,@RequestBody Tarefa tarefa) {
        return service.update(id, tarefa);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/finish")
    public Tarefa finishTask(@PathVariable Long id) {
        return service.finishTarefa(id);
    }

    @PatchMapping("/{id}/reopen")
    public Tarefa reopenTask(@PathVariable Long id) {
        return service.reopenTarefa(id);
    }

    @PatchMapping("/{id}/status")
    public Tarefa updateStatus(@PathVariable Long id,@RequestBody Map<String, String> body) {
        StatusTarefa novoStatus = StatusTarefa.valueOf(body.get("status"));
        return service.updateStatus(id, novoStatus);
    }

}