package com.gabrielgon.agenda.controller;

import com.gabrielgon.agenda.domain.Contato;
import com.gabrielgon.agenda.service.ContatoService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContatoController {

    private final ContatoService service;

    public ContatoController(ContatoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Contato> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contato> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Contato create(@RequestBody Contato contato) {
        return service.save(contato);
    }

    @PostMapping("/batch")
    public List<Contato> createContatos(@RequestBody List<Contato> contato) {
        return service.saveContatos(contato);
    }


    @PutMapping("/{id}")
    public Contato update(@PathVariable Long id, @RequestBody Contato contato) {
        return service.update(id, contato);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
