import { LoginCard } from "./components/auth/LoginCard"
import { RegisterCard } from "./components/auth/RegisterCard"
import { HeroSection } from "./components/layout/HeroSection"
import { StatusCard } from "./components/status/StatusCard"
import { TodoPanel } from "./components/todo/TodoPanel"
import { useTodoApp } from "./hooks/useTodoApp"

function App() {
  const { config, auth, todos, status } = useTodoApp()

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <HeroSection
        baseUrlInput={config.baseUrlInput}
        onBaseUrlInputChange={config.setBaseUrlInput}
        onSaveBaseUrl={config.saveBaseUrl}
      />

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.45fr]">
        <div className="space-y-6">
          <RegisterCard
            form={auth.registerForm}
            setForm={auth.setRegisterForm}
            onSubmit={auth.submitRegister}
            isSubmitting={auth.isRegistering}
          />

          <LoginCard
            form={auth.loginForm}
            setForm={auth.setLoginForm}
            onSubmit={auth.submitLogin}
            onLogout={auth.logout}
            tokenPreview={auth.tokenPreview}
            isSubmitting={auth.isLoggingIn}
          />

          <StatusCard
            noticeClass={status.noticeClass}
            noticeText={status.notice.text}
            logText={status.logText}
          />
        </div>

        <TodoPanel
          items={todos.items}
          drafts={todos.drafts}
          setDraftValue={todos.setDraftValue}
          newTodo={todos.newTodo}
          setNewTodo={todos.setNewTodo}
          newPriority={todos.newPriority}
          setNewPriority={todos.setNewPriority}
          isLoadingTodos={todos.isLoadingTodos}
          isAddingTodo={todos.isAddingTodo}
          updatingId={todos.updatingId}
          togglingId={todos.togglingId}
          deletingId={todos.deletingId}
          onRefresh={todos.refreshTodos}
          onAdd={todos.submitAddTodo}
          onUpdate={todos.submitUpdateTodo}
          onToggle={todos.submitToggleTodo}
          onDelete={todos.submitDeleteTodo}
        />
      </section>
    </main>
  )
}

export default App
