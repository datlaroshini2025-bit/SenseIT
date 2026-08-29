// syscall_demo.c - Custom system call simulation and using existing syscalls
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/syscall.h>
#include <sys/types.h>
#include <string.h>
#include <fcntl.h>
// Direct syscall examples using syscall()
void demonstrate_syscalls() {
// Using write syscall directly
const char *msg = "Hello via direct syscall!\n";
syscall(SYS_write, STDOUT_FILENO, msg, strlen(msg));
// Get PID using syscall
pid_t pid = syscall(SYS_getpid);
printf("PID via syscall: %d\n", pid);
// Get UID using syscall
uid_t uid = syscall(SYS_getuid);
printf("UID via syscall: %d\n", uid);
}
// Wrapper function simulating a custom syscall
int my_custom_add(int a, int b) {
// In real kernel module, this would be a syscall
printf("[SYSCALL] my_custom_add(%d, %d) invoked\n", a, b);
return a + b;
}
// File operations using low-level syscalls
void file_syscall_demo() {
int fd;
char buffer[100];
// Open file using syscall
fd = syscall(SYS_open, "test_syscall.txt", O_CREAT | O_WRONLY | O_TRUNC,
0644);
if (fd < 0) {
perror("open syscall failed");
return;
}
// Write using syscall
const char *data = "Written using direct syscall\n";
syscall(SYS_write, fd, data, strlen(data));
// Close using syscall
syscall(SYS_close, fd);
// Read back
fd = syscall(SYS_open, "test_syscall.txt", O_RDONLY, 0);
ssize_t bytes = syscall(SYS_read, fd, buffer, sizeof(buffer) - 1);
buffer[bytes] = '\0';
printf("Read from file: %s", buffer);
syscall(SYS_close, fd);
}
int main() {
printf("=== System Call Demonstration ===\n\n");
printf("1. Direct syscall usage:\n");
demonstrate_syscalls();
printf("\n2. Custom syscall simulation:\n");
int result = my_custom_add(15, 27);
printf("Result: %d\n", result);
printf("\n3. File I/O via syscalls:\n");
file_syscall_demo();
return 0;
}